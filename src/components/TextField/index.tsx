import { ChangeEvent, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  id,
  className,
  label,
  value,
  onChange,
  ...rest
}: Props) {
  return (
    <Wrapper className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={onChange} {...rest} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  padding: 8px 12px;
`;

const Label = styled.label`
  font-size: 12px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  line-height: 1;
`;
