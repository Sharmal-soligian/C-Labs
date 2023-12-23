import { Suspense, lazy, useCallback, useState } from "react";
import styled from "styled-components";

const LazySidebar = lazy(() => import("../components/Sidebar"));

const Segment = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarVisible(!sidebarVisible);
  }, [sidebarVisible]);

  return (
    <div>
      <SegmentContainer>
        <Button onClick={toggleSidebar}>Save Segment</Button>
      </SegmentContainer>

      {/* Toggle sidebar & Open sidebar component */}
      {sidebarVisible && (
        <Suspense>
          <LazySidebar toggleSidebar={toggleSidebar} />
        </Suspense>
      )}
    </div>
  );
};

export default Segment;

const SegmentContainer = styled.section`
  display: flex;
  margin: 50px;
`;
const Button = styled.button`
  padding: 20px 25px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: rgb(98, 97, 97);
  border: 3px solid #fff;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: rgb(52, 52, 52);
  }

  &:active {
    background-color: rgb(52, 52, 52);
    color: #fff;
    transform: scale(0.9);
  }
`;
