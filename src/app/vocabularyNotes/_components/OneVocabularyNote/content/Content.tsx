import { Stack } from "@mui/material";

export const Content: React.FC<{
  note: {
    frontContent: string;
    backContent: string;
  };
}> = ({ note }) => {
  return (
    <Stack spacing={0.25}>
      <Stack height={24} justifyContent="center">
        <span
          style={{
            fontWeight: "bold",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {note.frontContent}
        </span>
      </Stack>
      <Stack borderBottom={1} borderColor="grey.300" />
      <Stack height={56} justifyContent="center">
        <span
          style={{
            fontWeight: "bold",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {note.backContent}
        </span>
      </Stack>
    </Stack>
  );
};
