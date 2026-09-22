import { AboutBonusProgram } from "src/features/account/my-bonuses/components/AboutBonusProgram";
import { Bonuses } from "src/features/account/my-bonuses/components/Bonuses";
// import { LikeSection } from "@/features/account/my-bonuses/components/LikeSection";

export default function MyBonusesPage() {
  return (
    <main className=" w-full flex flex-col gap-4">
      <Bonuses />
      {/*<LikeSection />*/}
      <AboutBonusProgram />
    </main>
  );
}
