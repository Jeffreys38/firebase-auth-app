import {StyleSheet} from 'react-native';

import { useModalContext } from "@/src/context/ModalContext";
import { useMessageContext } from "@/src/context/MessageContext";
import ModalForm from '../../../src/components/ModalForm';
import MessageToast from "@/src/components/MessageToast";
import Table from '@/src/components/Table';

export default function () {
    const { isShowModalOpen, setShowModalOpen } = useModalContext();
    const { isShowMessageOpen, message, isError, setShowMessageOpen } = useMessageContext();

    return (
        <>
            <Table></Table>
            <MessageToast setShow={setShowMessageOpen} isShow={isShowMessageOpen} message={message} isError={isError}/>
            {/* Add */}
            <ModalForm showAlertDialog={isShowModalOpen} handleClose={setShowModalOpen} ></ModalForm>
        </>
    )
}

const styles = StyleSheet.create({
    'container': {
        backgroundColor: 'black',
        flex: 1,
        padding: 40
    },
    'title': {
        fontSize: 42,
        color: 'white',
        marginTop: 20
    }
})