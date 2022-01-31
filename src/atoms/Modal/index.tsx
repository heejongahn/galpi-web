import { ComponentProps } from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';

interface Props extends ComponentProps<typeof ReactModal> {
  className?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onRequestClose,
  className,
  children,
}: Props) {
  return (
    <StyledModal
      className={className}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={200}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      {children}
    </StyledModal>
  );
}

const StyledModal = styled(ReactModal)`
  background-color: white;
  padding: 24px;

  border-radius: 8px;
`;
