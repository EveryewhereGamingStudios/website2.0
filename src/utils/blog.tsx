import React from "react";

export function EmojiTextWithLineBreak({ text }: any) {
  const urlRegex = /(https?:\/\/\S+|www\.\S+)/gi;
  const textParts = text.split("<br />");

  return (
    <span>
      {textParts.map(
        (
          part:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined,
          index: any
        ) => {
          if (typeof part === "string") {
            const segments = part.split(urlRegex);

            const renderedSegments = segments.map((segment, i) => {
              if (segment.match(urlRegex)) {
                return (
                  <a
                    key={i}
                    href={`https://${segment}`}
                    target="_blank"
                    className="text-sky-400 font-bold"
                    rel="noreferrer"
                  >
                    {segment}
                  </a>
                );
              } else {
                return segment;
              }
            });

            return (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {renderedSegments}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={index}>
              {index > 0 && <br />} {part}
            </React.Fragment>
          );
        }
      )}
    </span>
  );
}
