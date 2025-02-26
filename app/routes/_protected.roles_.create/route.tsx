import { getSession } from "@/services/session";
import { fetchData, getHeaders } from "@/lib/fetch-data";
import { API_BASE_URL, authenticate } from "@/services/authenticate";
import PageContainer from "@/components/shared/page-container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Heading } from "@/components/shared/heading";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PermissionsGroup } from "@/lib/resource-types";
import { normalizeRolesWithPermissionsData } from "@/lib/data-helpers";
import CreateRoleForm from "./(components)/create-role-form";

export const meta: MetaFunction = () => {
    return [
        { title: "Create Role - Cage System" },
        {
            property: "og:title",
            content: "Create Role",
        },
        {
            name: "description",
            content: "Betrnk Cage Create Role",
        },
    ];
};

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const user = await authenticate(request, session);

    const headers = getHeaders(user.access_token);
    const url = `${API_BASE_URL}/admin/permissions/groups`;
    const res = await fetchData(url, headers);
    const data: PermissionsGroup[] = normalizeRolesWithPermissionsData(res);

    return json({ data });
};

const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Create Role", link: "/roles/create" },
];

function route() {
    const { data } = useLoaderData<typeof loader>();

    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <Heading title="Create Role" />
                <CreateRoleForm data={data} />
            </div>
        </PageContainer>
    );
}

export default route;
