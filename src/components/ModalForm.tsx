import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Button,
    ButtonText,
    Heading,
    Text,
    Input,
    InputField,
    FormControl,
    VStack,
} from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";

import DatabaseHelper from "@/src/helpers/DatabaseHelper";
import UserModel from "@/src/models/User";
import { useModalContext } from "@/src/context/ModalContext";
import { useMessageContext } from "@/src/context/MessageContext";
import { AppDispatch, RootState } from "@/src/store";
import { addUser } from "../store/slices/userSlice";

export default function UserDialog({ showAlertDialog, handleClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState<number>(1);

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedAge, setIsFocusedAge] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');

    const { setShowModalOpen } = useModalContext();
    const { setMessage, setShowMessageOpen } = useMessageContext();

    const databaseHelper = new DatabaseHelper<UserModel>("users");
    const dispatch: AppDispatch = useDispatch();

    const handleAdd = async () => {
        let valid = true;

        // Reset error states
        setNameError('');
        setEmailError('');
        setAgeError('');

        if (name.trim() === "") {
            setNameError("Name is required");
            setIsFocusedName(true);
            valid = false;
        }

        const regexText = /[^a-zA-Z]/;
        if (regexText.test(name)) {
            setNameError("Name is not valid, it has to contain a-z or A-Z");
            setIsFocusedName(true);
            valid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            setIsFocusedEmail(true);
            valid = false;
        }

        const regexAge = /[^0-9]/;
        if (age < 18 || age > 55) {
            setAgeError("Age must be greater than 18 or lower than 55");
            setIsFocusedAge(true);
            valid = false;
        }
        if (regexAge.test(age.toString())) {
            setAgeError("Age is not valid, it has to contain 0-9");
            setIsFocusedAge(true);
            valid = false;
        }

        if (!valid) return;

        try {
            const id = await databaseHelper.add({ name, age, email });
            dispatch(addUser({ name, age, email }));
            setShowModalOpen(false);
            setMessage("Add user successfully", false);
            setShowMessageOpen(true);
        } catch (error) {
            setMessage("An error occurred: " + error.name, true);
            setShowMessageOpen(true);
        }
    };

    return (
        <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <FormControl className="p-4 border rounded-lg border-outline-300">
                    <VStack space="xl">
                        <AlertDialogHeader>
                            <Heading className="text-typography-900 leading-3">Add New User</Heading>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <VStack space="xs">
                                <Text className="text-typography-500 leading-1">Name</Text>
                                <Input isFocused={isFocusedName}>
                                    <InputField
                                        type="text"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </Input>
                                {nameError && (
                                    <Text color={"$error500"} className="text-red-500">{nameError}</Text>
                                )}
                            </VStack>
                        </AlertDialogBody>

                        <AlertDialogBody>
                            <VStack space="xs">
                                <Text className="text-typography-500 leading-1">Email</Text>
                                <Input isFocused={isFocusedEmail}>
                                    <InputField
                                        type="text"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </Input>
                                {emailError && (
                                    <Text color={"$error500"} className="text-red-500">{emailError}</Text>
                                )}
                            </VStack>
                        </AlertDialogBody>

                        <AlertDialogBody>
                            <VStack space="xs">
                                <Text className="text-typography-500 leading-1">Age</Text>
                                <Input isFocused={isFocusedAge}>
                                    <InputField
                                        type="text"
                                        value={age}
                                        onChangeText={text => setAge(Number(text))}
                                    />
                                </Input>
                                {ageError && (
                                    <Text color={"$error500"} className="text-red-500">{ageError}</Text>
                                )}
                            </VStack>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button className="ml-auto" onPress={handleAdd}>
                                <ButtonText className="text-typography-0">Add</ButtonText>
                            </Button>
                        </AlertDialogFooter>
                    </VStack>
                </FormControl>
            </AlertDialogContent>
        </AlertDialog>
    );
}
