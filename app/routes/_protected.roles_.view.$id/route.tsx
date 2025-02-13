import { json, LoaderFunction } from "@remix-run/node";
import React from "react";
import { Breadcrumbs } from "~/components/shared/breadcrumbs";
import { Heading } from "~/components/shared/heading";
import PageContainer from "~/components/shared/page-container";
import {
  normalizeRoleData,
  normalizeRolesWithPermissionsData,
} from "~/lib/data-helpers";
import { fetchData, getHeaders } from "~/lib/fetch-data";
import normalizer from "~/lib/json-normalizer";
import { PermissionsGroup, Role } from "~/lib/resource-types";
import { serialize } from "~/lib/search-params";
import { API_BASE_URL, authenticate } from "~/services/authenticate";
import { getSession } from "~/services/session";
import UpdatePermissionForm from "./(components)/update-permission-form";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const user = await authenticate(request, session);
  const currentUrl = new URL(request.url); // Get the full URL
  const searchParams = currentUrl.searchParams; // Access query parameters

  const pageNumber = searchParams.get("page[number]") || 1;
  const pageSize = searchParams.get("page[size]") || 10;
  const filter = searchParams.get("filter[q]") || "";
  const sort = searchParams.get("sort") || "created_at";

  const headers = getHeaders(user.access_token);
  const permissionUrl = `${API_BASE_URL}/admin/permissions/groups`;
  const roleUrl = `${API_BASE_URL}/admin/roles/${id}/edit?include=permissions`;

  const getPermissionsResults = fetchData(permissionUrl, headers);
  const getRoleResult = fetchData(roleUrl, headers);

  const [permissionsResult, roleResult] = await Promise.all([
    getPermissionsResults,
    getRoleResult,
  ]);

  const data: PermissionsGroup[] =
    normalizeRolesWithPermissionsData(permissionsResult);
  const roleData: Role = normalizeRoleData(roleResult);

  return json({ data, roleData });
};

function route() {
  const { data, roleData, total } = useLoaderData<typeof loader>();

  const breadcrumbItems = [
    { title: "Role", link: "/roles" },
    { title: "Roles and Permissions", link: "/manage-roles/update" },
  ];

  return (
    <PageContainer scrollable={false}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title="Roles and Permissions" />
        <UpdatePermissionForm selectedRole={roleData} data={data} />
      </div>
    </PageContainer>
  );
}

export default route;
