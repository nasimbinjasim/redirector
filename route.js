import { redirect } from "next/navigation";
import links from "../../links.config.js";

export async function GET(request, { params }) {
  const { slug } = await params;
  const destination = links[slug];

  if (!destination) {
    // Unknown slug -> send to homepage (or show a 404 page instead)
    redirect("/");
  }

  redirect(destination);
}
