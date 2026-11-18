import Image from "next/image";
import { cn } from "@/lib/utils";

export type PatriciaFaceName =
  | "normal" | "happy" | "excited" | "thinking" | "confused" | "angry" | "sad" | "surprised" | "laughing" | "shy";

export type PatriciaPoseName = "wave" | "pointing" | "thinking" | "thumbs-up" | "cross-arms";

/** Round Patricia face avatar. */
export function PatriciaFace({
  face = "happy",
  size = 40,
  className,
}: {
  face?: PatriciaFaceName;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden rounded-full bg-orange-200", className)}
      style={{ width: size, height: size }}
    >
      <Image src={`/images/patricia/${face}.png`} alt="" fill sizes={`${size}px`} className="object-cover object-top" />
    </span>
  );
}

/** Full-body Patricia with the gentle idle bob. Size it with className (h-* w-*). */
export function PatriciaPose({
  pose = "wave",
  className,
  sizes = "160px",
}: {
  pose?: PatriciaPoseName;
  className?: string;
  sizes?: string;
}) {
  return (
    <div aria-hidden className={cn("relative shrink-0", className)}>
      <div className="pt-idle relative h-full w-full">
        <Image src={`/images/patricia/pose-${pose}.png`} alt="" fill sizes={sizes} className="object-contain object-bottom" />
      </div>
    </div>
  );
}
