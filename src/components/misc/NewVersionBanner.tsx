import * as React from "react";
import './NewVersionBanner.css';

interface IProps {
  display?: boolean;
}

export default function(props: IProps) {
  return (
    <button style={{display: props.display ? 'block' : 'none'}} className="update-available-banner">A newer version is available. Please <em>refresh</em> the page.</button>
  );
}
