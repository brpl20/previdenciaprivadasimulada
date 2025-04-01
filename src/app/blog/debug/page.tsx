import { allDocs } from "contentlayer/generated";
import Link from "next/link";

export default function DebugPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Debug Information</h1>
      <p className="mb-4">Total posts: {allDocs.length}</p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">SlugAsParams</th>
              <th className="border p-2">Permalink</th>
              <th className="border p-2">Raw Path</th>
              <th className="border p-2">URL</th>
              <th className="border p-2">Test Link</th>
            </tr>
          </thead>
          <tbody>
            {allDocs.map((doc, i) => {
              const url = `/blog/${doc.slugAsParams}`;
              return (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border p-2">{doc.title}</td>
                  <td className="border p-2">{doc.slug}</td>
                  <td className="border p-2">{doc.slugAsParams}</td>
                  <td className="border p-2">{doc.permalink || "N/A"}</td>
                  <td className="border p-2">{doc._raw.flattenedPath}</td>
                  <td className="border p-2">{url}</td>
                  <td className="border p-2">
                    <Link href={url} className="text-blue-600 hover:underline">
                      Test
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Potential Issues</h2>
        <ul className="list-disc pl-5">
          {allDocs.filter(doc => doc.permalink && doc.permalink.includes('/blog/blog/')).map((doc, i) => (
            <li key={i} className="text-red-600">
              Double blog prefix in permalink: {doc.title} - {doc.permalink}
            </li>
          ))}
          {allDocs.filter(doc => doc.slug && doc.slug.includes('/blog/blog/')).map((doc, i) => (
            <li key={i} className="text-red-600">
              Double blog prefix in slug: {doc.title} - {doc.slug}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
