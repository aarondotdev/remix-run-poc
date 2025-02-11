import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
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
import { serialize } from "swr/_internal";

export const meta: MetaFunction = () => {
  return [
    { title: "Manage Guests - Cage System" },
    {
      property: "og:title",
      content: "Manage Guests",
    },
    {
      name: "description",
      content: "Betrnk Cage Manage Guests",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = await authenticate(request, session);
  const currentUrl = new URL(request.url);
  const searchParams = currentUrl.searchParams;

  const pageNumber = searchParams.get("page[number]") || "1";
  const pageSize = searchParams.get("page[size]") || "15";
  const filter = searchParams.get("filter[q]") || "";
  const sort = searchParams.get("sort") || "created_at";

  const queryString = serialize({
    "page[number]": pageNumber,
    "page[size]": pageSize,
    sort: sort,
    "filter[q]": filter,
    include: "user.profile.avatar,agent",
  });

  const headers = getHeaders(user.access_token);
  const url = `${API_BASE_URL}/admin/players/?${queryString}`;
  const res = await fetchData(url, headers);
  const normalizedData = normalizer(res);
  const data = normalizedData?.data;
  const total = res.meta.total;

  return json({ data, total });
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Guests", link: "/guests" },
];

function route() {
  const { data, total } = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title="Guests" description={`Total Items ${total}`} />
        <DataTable columns={columns} data={data} totalItems={total} />
      </div>
    </PageContainer>
  );
}

export default route;
