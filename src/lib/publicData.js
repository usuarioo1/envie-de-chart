import connectDB from "@/lib/mongodb";
import Animateur from "@/models/Animateur";
import Stage from "@/models/Stage";
import Workshop from "@/models/Workshop";

function serialize(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getPublicAnimateurs(country) {
  await connectDB();
  const animateurs = await Animateur.find({ country, isActive: true })
    .sort({ country: 1, name: 1 })
    .lean();
  return serialize(animateurs);
}

export async function getPublicStages() {
  await connectDB();
  const stages = await Stage.find({ status: "published" })
    .sort({ date: 1, createdAt: -1 })
    .lean();
  return serialize(stages);
}

export async function getPublicWorkshops() {
  await connectDB();
  const workshops = await Workshop.find({
    isActive: true,
    date: { $gte: new Date() },
  })
    .sort({ date: 1 })
    .lean();
  return serialize(workshops);
}
