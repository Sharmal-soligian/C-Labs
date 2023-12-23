import styled from "styled-components";

// eslint-disable-next-line react/prop-types
const Footer = ({ onSaveSegment, onCancelSegment }) => {
  return (
    <FooterContainer>
      <SaveButton onClick={onSaveSegment}>Save Segment</SaveButton>
      <CancelButton onClick={onCancelSegment}>Cancel</CancelButton>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #e8e5e5;
  padding: 15px;
`;
const SaveButton = styled.button`
  background-color: #2bbbad;
  border: transparent;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 2px;
  cursor: pointer;
`;
const CancelButton = styled.button`
  background-color: #fff;
  color: #9e1515;
  border: transparent;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 2px;
  cursor: pointer;
`;
