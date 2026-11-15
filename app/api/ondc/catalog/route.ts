import { NextResponse } from "next/server";
import { PRODUCTS, ARTISANS } from "@/data/seedData";

export async function GET() {
  const ondcCatalog = {
    context: {
      domain: "nic2004:52110",
      country: "IND",
      city: "std:080",
      action: "on_search",
      core_version: "1.2.0",
      bap_id: "ondc.buyer.spirit.in",
      bpp_id: "ondc.artisan-network.spirit.in",
      timestamp: new Date().toISOString()
    },
    message: {
      catalog: {
        "bpp/descriptor": {
          name: "Spirit Artisan Federation (Beckn Protocol Enabled)",
          symbol: "https://spirit-artisans.org/logo.png",
          short_desc: "Direct-from-maker authentic Indian handicrafts, verified provenance, fair floor pricing.",
          long_desc: "A decentralized network of traditional craftspeople empowered by autonomous AI agents and Celine Khata."
        },
        "bpp/providers": ARTISANS.map((artisan) => ({
          id: artisan.id,
          descriptor: {
            name: artisan.name,
            code: artisan.giTag,
            short_desc: `${artisan.craft} from ${artisan.cluster}, ${artisan.state}`,
            images: [artisan.avatar]
          },
          locations: [
            {
              id: `${artisan.id}-loc`,
              city: artisan.cluster,
              state: artisan.state,
              country: "IND"
            }
          ],
          items: PRODUCTS.filter((p) => p.artisanId === artisan.id).map((prod) => ({
            id: prod.id,
            descriptor: {
              name: prod.title,
              code: prod.provenanceHash,
              symbol: prod.images[0],
              short_desc: prod.description
            },
            price: {
              currency: "INR",
              value: prod.price.toString()
            },
            category_id: prod.category,
            fulfillment_id: "F1",
            tags: {
              artisan_floor_price: prod.costBreakdown.rawMaterials + prod.costBreakdown.laborHours * 70,
              gi_certified: prod.verifiedGi ? "YES" : "NO",
              craft_technique: prod.craftTechnique,
              provenance_hash: prod.provenanceHash
            }
          }))
        }))
      }
    }
  };

  return NextResponse.json(ondcCatalog);
}
