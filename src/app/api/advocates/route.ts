import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(req: Request) {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  // const data = advocateData;

  // Parse the query parameters from the request URL
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const searchTerm = queryParams.get("search") || "";
  // If no search term is provided, return all advocates
  if (!searchTerm) {
    return Response.json({ data });
  }
  // Filter the advocates based on the search term

  
  const filteredAdvocates = data.filter((advocate) => {
    return (
      advocate.firstName.toLowerCase().includes(searchTerm) ||
      advocate.lastName.toLowerCase().includes(searchTerm) ||
      advocate.city.toLowerCase().includes(searchTerm) ||
      advocate.degree.toLowerCase().includes(searchTerm) ||
      advocate.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm)
      ) ||
      advocate.yearsOfExperience.toString().toLowerCase().includes(searchTerm)
    );
  });

  return Response.json({ data: filteredAdvocates });
}
