import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../css/usercard.module.css";

const CardSkeleton = ({ cards }: any) => {
  return Array(cards)
    .fill(0)
    .map((_, id) => (
      <li key={id} className="user__card user__skeleton flex">
        <SkeletonTheme baseColor="#353535" highlightColor="#525252">
          <Skeleton circle width={100} height={100}></Skeleton>
          <div className="user__text-area">
            <h2 className="user__name">
              <Skeleton></Skeleton>
            </h2>
            <p className="user__email">
              <Skeleton></Skeleton>
            </p>
          </div>
        </SkeletonTheme>
      </li>
    ));
};
export default CardSkeleton;
