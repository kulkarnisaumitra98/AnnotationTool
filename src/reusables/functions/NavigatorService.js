import React from 'react';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(routeName, params) {
  if (isMountedRef.current && navigationRef.current) {
    console.log('Mounted', navigationRef.current);
    navigationRef.current.navigate(routeName);
  } else {
    console.log('Not mounted');
  }
}
