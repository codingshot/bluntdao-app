import React, { useState } from "react";
import style from "./dashbaordMembers.module.css";
import { leaderboardData, numberWithCommas } from "../dashnoard-content/Utils";
import FilterDropdown from "../filter-dropdown/filterDropdown";
import ReactPaginate from "react-paginate";
// Assets
import { ReactComponent as CopyIcon } from "../../assets/imgs/icon-copy-outline.svg";
import { ReactComponent as Trophy } from "../../assets/imgs/icon-trophy.svg";
import { ReactComponent as SolanaIcon } from "../../assets/imgs/icon-solana.svg";
import { ReactComponent as TriUp } from "../../assets/imgs/tri-up.svg";
import { ReactComponent as TriDown } from "../../assets/imgs/tri-down.svg";
import { ReactComponent as BronzeIcon } from "../../assets/imgs/bronze-icon.svg";
import { ReactComponent as SilverIcon } from "../../assets/imgs/silver-icon.svg";
import { ReactComponent as GoldIcon } from "../../assets/imgs/gold-icon.svg";
import userIcon from "../../assets//imgs/dashboard/user-icon.png";

const DashbaordMembers = () => {
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("");
  const perPage = 8;
  const pageVisited = pageNumber * perPage;

  const PageCount = (gameList: any) => {
    return Math.ceil(gameList.length / perPage);
  };

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>
          <Trophy /> Top Validators
        </p>
      </div>
      <div className={style.cardsWrapper}>
        <div>
          <div className={style.content}>
            <div className={style.icon}>
              <img src={leaderboardData[0].icon} alt="" />
              <GoldIcon />
            </div>
            <div className={style.text}>
              <div>
                {leaderboardData[0].address}{" "}
                <CopyIcon className={style.copyIcon} />
                <SolanaIcon className={style.solanaIcon} />
              </div>
              <p>Joined: {leaderboardData[0].dateJoined}</p>
            </div>
          </div>
          <div className={style.line}></div>
          <div className={style.cardBottom}>
            <div className={style.chapter}>{leaderboardData[0].chapter}</div>
            <div className={style.onboraded}>
              {numberWithCommas(leaderboardData[0].onboards)} Onboarded
            </div>
          </div>
        </div>

        <div>
          <div className={style.content}>
            <div className={style.icon}>
              <img src={leaderboardData[1].icon} alt="" />
              <SilverIcon />
            </div>
            <div className={style.text}>
              <div>
                {leaderboardData[1].address}{" "}
                <CopyIcon className={style.copyIcon} />
                <SolanaIcon className={style.solanaIcon} />
              </div>
              <p>Joined: {leaderboardData[1].dateJoined}</p>
            </div>
          </div>
          <div className={style.line}></div>
          <div className={style.cardBottom}>
            <div className={style.chapter}>{leaderboardData[1].chapter}</div>
            <div className={style.onboraded}>
              {numberWithCommas(leaderboardData[1].onboards)} Onboarded
            </div>
          </div>
        </div>

        <div>
          <div className={style.content}>
            <div className={style.icon}>
              <img src={leaderboardData[2].icon} alt="" />
              <BronzeIcon />
            </div>
            <div className={style.text}>
              <div>
                {leaderboardData[2].address}{" "}
                <CopyIcon className={style.copyIcon} />
                <SolanaIcon className={style.solanaIcon} />
              </div>
              <p>Joined: {leaderboardData[2].dateJoined}</p>
            </div>
          </div>
          <div className={style.line}></div>
          <div className={style.cardBottom}>
            <div className={style.chapter}>{leaderboardData[2].chapter}</div>
            <div className={style.onboraded}>
              {numberWithCommas(leaderboardData[2].onboards)} Onboarded
            </div>
          </div>
        </div>
      </div>
      <div className={style.subHeader}>
        <p>All Members (12,200)</p>
        <FilterDropdown
          data={[
            {
              label: "All Blockchain",
              value: "all",
            },
            {
              label: "Solana",
              value: "solanas",
            },
            {
              label: "Near",
              value: "near",
            },
          ]}
        />
      </div>
      <div className={style.tabWrapper}>
        <div className={style.tableHeader}>
          <div># Rank</div>
          <div>
            Address
            <div className={style.controller}>
              <TriUp
                className={
                  currentFilter === "address-ascend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("address-ascend");
                  leaderboardData.sort((a, b) =>
                    a.address.localeCompare(b.address)
                  );
                }}
              />
              <TriDown
                className={
                  currentFilter === "address-descend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("address-descend");
                  leaderboardData.sort((a, b) =>
                    b.address.localeCompare(a.address)
                  );
                }}
              />
            </div>
          </div>
          <div>
            Onboards
            <div className={style.controller}>
              <TriUp
                className={
                  currentFilter === "onboards-ascend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("onboards-ascend");
                  leaderboardData.sort((a, b) =>
                    a.onboards.localeCompare(b.onboards)
                  );
                }}
              />
              <TriDown
                className={
                  currentFilter === "onboards-descend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("onboards-descend");
                  leaderboardData.sort((a, b) =>
                    b.onboards.localeCompare(a.onboards)
                  );
                }}
              />
            </div>
          </div>
          <div>
            Date Joined
            <div className={style.controller}>
              <TriUp
                className={currentFilter === "date-ascend" ? style.active : ""}
                onClick={() => {
                  setCurrentFilter("date-ascend");
                  leaderboardData.sort((a, b) =>
                    a.dateJoined.localeCompare(b.dateJoined)
                  );
                }}
              />
              <TriDown
                className={currentFilter === "date-descend" ? style.active : ""}
                onClick={() => {
                  setCurrentFilter("date-descend");
                  leaderboardData.sort((a, b) =>
                    b.dateJoined.localeCompare(a.dateJoined)
                  );
                }}
              />
            </div>
          </div>
          <div>
            Blockchain
            <div className={style.controller}>
              <TriUp
                className={
                  currentFilter === "blockchain-ascend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("blockchain-ascend");
                  leaderboardData.sort((a, b) =>
                    a.blockchain.localeCompare(b.blockchain)
                  );
                }}
              />
              <TriDown
                className={
                  currentFilter === "blockchain-descend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("blockchain-descend");
                  leaderboardData.sort((a, b) =>
                    b.blockchain.localeCompare(a.blockchain)
                  );
                }}
              />
            </div>
          </div>
          <div>
            Chapter
            <div className={style.controller}>
              <TriUp
                className={
                  currentFilter === "chapter-ascend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("chapter-ascend");
                  leaderboardData.sort((a, b) =>
                    a.chapter.localeCompare(b.chapter)
                  );
                }}
              />
              <TriDown
                className={
                  currentFilter === "chapter-descend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("chapter-descend");
                  leaderboardData.sort((a, b) =>
                    b.chapter.localeCompare(a.chapter)
                  );
                }}
              />
            </div>
          </div>
          <div>
            Sesh Score
            <div className={style.controller}>
              <TriUp
                className={currentFilter === "score-ascend" ? style.active : ""}
                onClick={() => {
                  setCurrentFilter("score-ascend");
                  leaderboardData.sort((a, b) =>
                    a.seshScore.localeCompare(b.seshScore)
                  );
                }}
              />
              <TriDown
                className={
                  currentFilter === "score-descend" ? style.active : ""
                }
                onClick={() => {
                  setCurrentFilter("score-descend");
                  leaderboardData.sort((a, b) =>
                    b.seshScore.localeCompare(a.seshScore)
                  );
                }}
              />
            </div>
          </div>
        </div>
        {leaderboardData
          .slice(pageVisited, pageVisited + perPage)
          .map((elem) => (
            <div className={style.tableItemWrapper}>
              <div>{elem.rank}</div>
              <div>
                <img src={elem.icon} alt="" />
                {elem.address}
              </div>
              <div>{elem.onboards}</div>
              <div>{elem.dateJoined}</div>
              <div>{elem.blockchain}</div>
              <div>{elem.chapter}</div>
              <div>
                <p className={style.tableItemPrg}>{elem.seshScore}</p>
              </div>
            </div>
          ))}
      </div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={PageCount(leaderboardData)}
        onPageChange={changePage}
        containerClassName="pagination"
        previousLinkClassName="page-prev"
        nextLinkClassName="page-next"
        disabledClassName="pagination-disabled"
        activeClassName="active-page"
        pageLinkClassName="page-number"
      />
    </div>
  );
};

export default DashbaordMembers;
