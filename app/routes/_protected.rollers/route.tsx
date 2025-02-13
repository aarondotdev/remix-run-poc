import normalizer from "~/lib/json-normalizer";
import { Metadata } from "next";
import { DataTable } from "./(components)/data-table";
import { useTranslation } from "react-i18next";
import PageContainer from "~/components/shared/page-container";
import { Breadcrumbs } from "~/components/shared/breadcrumbs";
import { Heading } from "~/components/shared/heading";
import { getSession } from "~/services/session";
import { API_BASE_URL, authenticate } from "~/services/authenticate";
import { serialize } from "~/lib/search-params";
import { fetchData, getHeaders } from "~/lib/fetch-data";
import { useLoaderData } from "@remix-run/react";
import {
  json,
  LoaderFunction,
  MetaFunction,
  SessionData,
} from "@remix-run/node";
import { columns } from "./(components)/columns";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Manage Rollers - Cage System",
      description: "Betrnk Cage Manage Rollers",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user") as SessionData;
  const currentUrl = new URL(request.url); // Get the full URL
  const searchParams = currentUrl.searchParams; // Access query parameters

  const pageNumber = searchParams.get("page[number]");
  const pageSize = searchParams.get("page[size]");
  const sort = searchParams.get("sort");
  const filter = searchParams.get("filter[q]");

  const queryString = serialize({
    "page[number]": Number(pageNumber),
    "page[size]": Number(pageSize),
    sort: sort,
    "filter[q]": filter,
  });

  const headers = getHeaders(user.access_token);
  const url = `${API_BASE_URL}/admin/rollers/${queryString}`;
  const res = await fetchData(url, headers);
  const normalizedData = normalizer(res);
  const data = normalizedData?.data;
  const total = res.meta.total;

  return json({ data, total, queryString });
};

function route() {
  const { t } = useTranslation();
  const { data, total } = useLoaderData<typeof loader>();

  const breadcrumbItems = [
    { title: t("button_dashboard"), link: "/dashboard" },
    { title: "Rollers", link: "/manage-rollers" },
  ];

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading
          title="Rollers"
          description={`${t("p1_total_items")}: ${total}`}
        />
        <DataTable columns={columns} data={data} totalItems={total} />
      </div>
    </PageContainer>
  );
}

export default route;
