import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ModalComponent() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [value, setValue] = useState("1");
  const navigate = useNavigate();

   // Open the modal immediately when the component mounts
   useEffect(() => {
    onOpen();
  }, [onOpen]);

  // Function to handle navigation based on the selected radio button value
  const handleNavigation = () => {
    if (value === "1") {
      navigate("/dashboard/user-profile-setup");
    } else if (value === "2") {
      navigate("/dashboard/business-profile-setup");
    } 
    // else if (value === "3") {
    //   navigate("/adprofilesetup");
    // }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What kind of account are you creating?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={setValue} value={value}>
              <Stack>
                <Radio colorScheme="red" value="1">User Account</Radio>
                <Radio colorScheme="red" value="2">Business Account</Radio>
                {/* <Radio colorScheme="orange" value="3">Ad Account</Radio> */}
              </Stack>
            </RadioGroup>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3}
            onClick={handleNavigation}
            >
              Setup Profile
            </Button>
            <Button onClick={onClose} variant="ghost">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalComponent;
