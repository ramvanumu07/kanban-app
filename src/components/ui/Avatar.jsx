 // src/components/ui/Avatar.jsx
import React from 'react';
import styled from 'styled-components';

/* 
 - Can show initials or an image.
 - Used in Task cards for assignee.
 */

const Circle = styled.div`
  width: ${({ size }) => size || '32px'};
  height: ${({ size }) => size || '32px'};
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src})` : '#f5f6fa'};
  background-size: cover;
  background-position: center;
  color: #fff;
  font-weight: 700;
  font-size: ${({ size }) => size ? `${parseInt(size)/2}px` : '16px'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e4e7ef;
  box-sizing: border-box;
  overflow: hidden;
`;

/**
 * Avatar (image or initials)
 * @param {object} props: src, alt, initials, size
 */
function Avatar({ src, alt, initials, size = '32px' }) {
  if (src) {
    return <Circle src={src} size={size} aria-label={alt || 'avatar'} />;
  }
  return <Circle size={size}>{initials}</Circle>;
}

export default React.memo(Avatar);
