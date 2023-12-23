import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ toggleSidebar }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    "First Name",
    "Last Name",
    "gender",
    "age",
    "Account Name",
    "city",
    "state",
  ]);

  const handleSchemaChange = useCallback((selectedOption) => {
    setSelectedSchema(selectedOption.label);
  }, []);

  const handleAddNewSchema = useCallback(() => {
    if (selectedSchema && !selectedSchemas.includes(selectedSchema)) {
      setSelectedSchemas([...selectedSchemas, selectedSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema !== selectedSchema)
      );
      setSelectedSchema("");
    }
  }, [availableSchemas, selectedSchema, selectedSchemas]);

  const handleNewSchemaChange = useCallback(() => {
    if (selectedSchema && !selectedSchemas.includes(selectedSchema)) {
      setSelectedSchemas([...selectedSchemas, selectedSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema !== selectedSchema)
      );
      setSelectedSchema("");
    }
  }, [availableSchemas, selectedSchema, selectedSchemas]);

  const handleSaveSegment = async (e) => {
    e.preventDefault();
    const requestData = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({ [schema]: schema })),
    };

    try {
      await axios.post(
        `https://webhook.site/12e0e211-3264-46d1-876f-41caeb98be98`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedSchema("");
      setSegmentName("");
    } catch (error) {
      console.error("Error saving segment: ", error);
    }
  };

  const options = useMemo(
    () =>
      availableSchemas.map((schema) => ({
        value: schema,
        label: schema.charAt(0).toUpperCase() + schema.slice(1),
      })),
    [availableSchemas]
  );

  return (
    <SidebarWrapper>
      <TopHeader>
        <CloseSidebarButton>
          <h1 onClick={toggleSidebar}>{"<"}</h1>
          <span>
            <h1>Saving Segment</h1>
          </span>
        </CloseSidebarButton>
      </TopHeader>

      <SegmentNameContainer>
        <h3>Enter the Name of the Segment</h3>
        <SegmentNameInput
          onChange={(e) => setSegmentName(e.target.value)}
          placeholder="Name of the segment"
        />
      </SegmentNameContainer>

      {/* Dropdown for adding schema */}
      <SchemaDropdown>
        <label htmlFor="schema">Add Schema to segment</label>
        <CustomSelect
          placeholder={`Add schema to segment`}
          value={{ value: selectedSchema, label: selectedSchema }}
          onChange={handleSchemaChange}
          options={options}
        />
      </SchemaDropdown>

      <AddNew onClick={handleAddNewSchema}><b>+</b> Add new schema</AddNew>

      {/* Render selected schemas */}
      {selectedSchemas.map((schema, index) => (
        <SchemaDropdown key={index}>
          <label>{`Schema ${index + 1}`}</label>
          <CustomSelect
            placeholder={`Select schema`}
            value={{ value: schema, label: schema }}
            onChange={(newSchema) => handleNewSchemaChange(newSchema, index)}
            options={options.filter((option) => option.value !== schema)}
          />
        </SchemaDropdown>
      ))}

      {/* Footer */}
      <Footer onSaveSegment={handleSaveSegment} onCancelSegment={toggleSidebar} />
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  color: #000;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const TopHeader = styled.div`
  background-color: #2bbbad;
`;
const CloseSidebarButton = styled.button`
  display: flex;
  color: #fff;
  border: none;
  cursor: pointer;
  background-color: #2bbbad;
  padding: 20px;

  h1 {
    margin: 0;
  }

  span {
    margin-left: 10px;
  }
`;
const SegmentNameContainer = styled.div`
  color: #515050;
  display: flex;
  align-items: center;
  height: 20%;
  flex-direction: column;
  justify-content: center;
`;
const SegmentNameInput = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px 10px;
  font-size: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #000;

  &:focus {
    outline: none;
    border-color: #1a1a1a;
  }
`;
const SchemaDropdown = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin-bottom: 5px;
    display: block;
  }

  select {
    width: 80%;
    padding: 10px;
    font-size: 1rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
    color: #000;

    &:focus {
      outline: none;
      border-color: #1a1a1a;
    }
  }
`;
const CustomSelect = styled(Select)`
  width: 80%;
  &::placeholder {
    color: #000;
  }
  .react-select__control {
    border: 1px solid #ccc;
    border-radius: 2px;
  }
  .react-select__menu {
    margin-top: 2px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: none;
  }
  .react-select__option {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  .react-select__single-value {
    color: #000;
  }
  .react-select__placeholder {
    color: #000;
  }
`;
const AddNew = styled(Link)`
  color: #14ae14;
  display: flex;
  justify-content: center;
  height: 10%;
  align-items: center;
`;