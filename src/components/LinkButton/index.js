import React from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';

function LinkButton(props) {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props;

  function handleClick() {
    history.push(props.to);
  }

  return <Button onClick={handleClick} {...rest}> { props.children } </Button>;
}

export default withRouter(LinkButton);
