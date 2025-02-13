import {
  json,
  LoaderFunction,
  MetaFunction,
  SessionData,
} from "@remix-run/node";
import { getSession } from "~/services/session";
import { fetchData, getHeaders } from "~/lib/fetch-data";
import { API_BASE_URL, authenticate } from "~/services/authenticate";
import { useLoaderData } from "@remix-run/react";
import normalizer from "~/lib/json-normalizer";
import PageContainer from "~/components/shared/page-container";
import { Breadcrumbs } from "~/components/shared/breadcrumbs";
import { Heading } from "~/components/shared/heading";
import { columns } from "./(components)/columns";
import { DataTable } from "./(components)/data-table";
import { serialize } from "~/lib/search-params";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage Users - Cage System" },
    {
      property: "og:title",
      content: "Manage Users",
    },
    {
      name: "description",
      content: "Betrnk Cage Manage Users",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user") as SessionData;
  const currentUrl = new URL(request.url); // Get the full URL
  const searchParams = currentUrl.searchParams; // Access query parameters

  const pageNumber = searchParams.get("page[number]") || 1;
  const pageSize = searchParams.get("page[size]") || 10;
  const filter = searchParams.get("filter[q]") || "";
  const sort = searchParams.get("sort") || "created_at";

  const queryString = serialize({
    "page[number]": Number(pageNumber),
    "page[size]": Number(pageSize),
    sort: sort,
    "filter[q]": filter,
    "filter[is_player]": false,
    include: "profile,roles,junketSites",
  });

  const headers = getHeaders(user.access_token);
  const url = `${API_BASE_URL}/admin/users/${queryString}`;
  const res = await fetchData(url, headers);
  const normalizedData = normalizer(res);
  const data = normalizedData?.data;
  const total = res.meta.total;

  return json({ data, total, queryString });
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users", link: "/users" },
];

function route() {
  const { data, total } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title="Users" description={`Total Items ${total}`} />
        <DataTable columns={columns} data={data} totalItems={total} />
      </div>
    </PageContainer>
  );
}

export default route;
