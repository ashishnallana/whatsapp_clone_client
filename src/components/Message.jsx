import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function Message({ details, userMsg }) {
  const dateTime = new Date(details.createdAt);
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
  const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);

  return (
    <div className={userMsg ? "flex my-2" : "flex flex-row-reverse my-2"}>
      <div className="flex-1"></div>

      <div
        className={
          userMsg
            ? "bg-[#005c4b] flex flex-col items-end mr-3 p-3 rounded-md"
            : "bg-[#202c33] flex flex-col ml-3 p-3 rounded-md"
        }
      >
        <div className="my-2">
          {details.files.length !== 0 && (
            <div>
              {details.files.map((e, i) => {
                return (
                  <div
                    style={{
                      backgroundImage: `url(${e})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="h-[100px] w-[100px] rounded"
                  ></div>
                );
              })}
            </div>
          )}
        </div>
        <p className="">{details.content}</p>
        <div className="flex space-x-2 items-center mt-2">
          <p className="text-xs">{formattedDate + " | " + formattedTime}</p>
          {userMsg && (
            <DoneAllIcon className={details.seen ? "text-blue-400" : ""} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
