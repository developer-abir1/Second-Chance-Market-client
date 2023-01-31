import { formatDistanceToNow, parseISO } from 'date-fns/esm';
import React from 'react';

const TimeAgo = ({ timestap }: any) => {
  let timeAgo = '';
  if (timestap) {
    const date = parseISO(timestap);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestap}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
