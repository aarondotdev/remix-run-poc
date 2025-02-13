import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Breadcrumbs } from "~/components/shared/breadcrumbs";
import { Heading } from "~/components/shared/heading";
import PageContainer from "~/components/shared/page-container";
import {
  normalizeRoleData,
  normalizeRolesWithPermissionsData,
} from "~/lib/data-helpers";
import { fetchData, getHeaders } from "~/lib/fetch-data";
import { PermissionsGroup, Role } from "~/lib/resource-types";
import { API_BASE_URL, authenticate } from "~/services/authenticate";
import { getSession } from "~/services/session";
import UpdatePermissionForm from "./(components)/update-permission-form";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Roles and Permissions - Cage System" },
    {
      property: "og:title",
      content: "Roles and permissions",
    },
    {
      name: "description",
      content: "Betrnk Cage Roles and Permissions",
    },
  ];
};


export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const user = await authenticate(request, session);

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
  const { data, roleData } = useLoaderData<typeof loader>();

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
