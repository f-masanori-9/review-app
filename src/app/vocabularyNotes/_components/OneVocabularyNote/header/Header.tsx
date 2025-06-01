import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const Header: FC<{
  daysAgo: number;
  tags: { tagId: string; tagName: string }[];
}> = ({ daysAgo, tags }) => {
  return (
    <Stack height={"24px"} direction="row" spacing={2} alignItems="center">
      <Box>
        <Typography variant="body2" component="div" color="textSecondary">
          {daysAgo}日前
        </Typography>
      </Box>

      <Stack direction="row" spacing={0.5} alignItems="center">
        {tags.map((tag) => (
          <Chip
            key={tag.tagId}
            color="primary"
            label={tag.tagName}
            size="small"
          />
        ))}
      </Stack>
    </Stack>
  );
};
