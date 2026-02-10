import React from "react";

const L_CLIP = "polygon(0 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%)";
const T_CLIP = "polygon(0 0, 100% 0, 100% 50%, 66.67% 50%, 66.67% 100%, 33.33% 100%, 33.33% 50%, 0 50%)";

const GAP = 1.2; // % gap between blocks so nothing overlaps

type BlockDef = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  box: { left: number; top: number; width: number; height: number };
  /** Slight offset (%) for a less rigid, randomised look */
  shift?: { x: number; y: number };
  clipPath?: string;
};

// Layout with gaps; shift adds soft randomness so it’s not a strict grid
const BLOCKS: BlockDef[] = [
  { id: 1, title: "Podcast", subtitle: "Record", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop", box: { left: 0, top: 0, width: 31.5, height: 48 }, shift: { x: 0.2, y: 0.1 } },
  { id: 2, title: "Photoshoot", subtitle: "Capture", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop", box: { left: 32.7 + GAP, top: 0, width: 31.5, height: 23 }, shift: { x: -0.1, y: 0.15 } },
  { id: 3, title: "Cove", subtitle: "Space", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=800&auto=format&fit=crop", box: { left: 65.2 + 2 * GAP, top: 0, width: 14.8, height: 23 }, shift: { x: 0.3, y: 0 } },
  { id: 4, title: "Vault", subtitle: "Private", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop", box: { left: 81 + 3 * GAP, top: 0, width: 14.8, height: 23 }, shift: { x: -0.2, y: 0.2 } },
  { id: 5, title: "Events", subtitle: "Host", image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop", box: { left: 0, top: 49 + GAP, width: 14.8, height: 48 }, shift: { x: 0.15, y: -0.1 } },
  { id: 6, title: "Record", subtitle: "Stream", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop", box: { left: 15.8 + GAP, top: 49 + GAP, width: 31.5, height: 48 }, shift: { x: -0.2, y: 0.1 }, clipPath: L_CLIP },
  { id: 7, title: "Studio", subtitle: "Create", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800&auto=format&fit=crop", box: { left: 48.3 + 2 * GAP, top: 24 + GAP / 2, width: 15.8, height: 48 }, shift: { x: 0.1, y: -0.15 }, clipPath: T_CLIP },
  { id: 8, title: "Mix", subtitle: "Edit", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop", box: { left: 32.7 + GAP, top: 24 + GAP / 2, width: 14.8, height: 23 }, shift: { x: 0.25, y: 0.2 } },
  { id: 9, title: "Nest", subtitle: "Quiet", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=800&auto=format&fit=crop", box: { left: 65.2 + 2 * GAP, top: 24 + GAP / 2, width: 14.8, height: 23 }, shift: { x: -0.15, y: 0 } },
  { id: 10, title: "Apex", subtitle: "Prime", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop", box: { left: 81 + 3 * GAP, top: 24 + GAP / 2, width: 14.8, height: 23 }, shift: { x: 0.1, y: -0.1 } },
  { id: 11, title: "Live", subtitle: "Broadcast", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop", box: { left: 48.3 + 2 * GAP, top: 73 + 2 * GAP, width: 14.8, height: 23 }, shift: { x: -0.2, y: 0.15 } },
  { id: 12, title: "Content", subtitle: "Produce", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop", box: { left: 65.2 + 2 * GAP, top: 73 + 2 * GAP, width: 14.8, height: 23 }, shift: { x: 0.2, y: -0.2 } },
  { id: 13, title: "Exec", subtitle: "Suite", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800&auto=format&fit=crop", box: { left: 81 + 3 * GAP, top: 49 + GAP, width: 14.8, height: 48 }, shift: { x: -0.1, y: 0.05 } },
];

function BlockTile({ block }: { block: BlockDef }) {
  const left = block.box.left + (block.shift?.x ?? 0);
  const top = block.box.top + (block.shift?.y ?? 0);
  return (
    <article
      className="absolute overflow-hidden rounded-2xl group"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${block.box.width}%`,
        height: `${block.box.height}%`,
        clipPath: block.clipPath ?? undefined,
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${block.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4">
        <p className="text-white/90 text-[10px] md:text-xs uppercase tracking-widest font-medium mb-0.5">
          {block.subtitle}
        </p>
        <h3 className="font-serif text-sm md:text-lg lg:text-2xl text-white tracking-tight leading-tight">
          {block.title}
        </h3>
      </div>
    </article>
  );
}

export default function TetraBlockGrid() {
  return (
    <section id="tetra-grid" className="bg-white min-h-screen">
      <header className="text-center py-3 md:py-4">
        <span className="text-champagne-600 uppercase tracking-[0.2em] text-xs font-bold">
          Spaces
        </span>
        <h2 className="font-serif text-2xl md:text-4xl text-charcoal-900 mt-1">
          Tetra <span className="italic text-stone-500">Block</span>
        </h2>
      </header>

      {/* Full width; soft rounded container with thin padding */}
      <div className="w-full px-2 md:px-3">
        <div
          className="relative w-full bg-stone-200 rounded-3xl overflow-hidden"
          style={{ height: "calc(100vh - 5rem)", minHeight: 360 }}
        >
        {BLOCKS.map((block) => (
          <React.Fragment key={block.id}>
            <BlockTile block={block} />
          </React.Fragment>
        ))}
        </div>
      </div>
    </section>
  );
}
