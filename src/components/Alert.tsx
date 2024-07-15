import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAlertMessage } from "@/redux/reducers/app";
import { handleKeyboardClick } from "@/utils";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { t } from "i18next";
import { useCallback, useEffect } from "react";

function Alert(): JSX.Element {
	const dispatch = useAppDispatch();
	const alertMessage = useAppSelector((state) => {
		return state.app.alertMessage;
	});

	const closeDialog = useCallback(() => {
		dispatch(setAlertMessage({}));
	}, [dispatch]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Enter") {
				closeDialog();
			}
		};
		if (alertMessage) {
			document.addEventListener("keydown", handleKeyDown);
		} else {
			document.removeEventListener("keydown", handleKeyDown);
		}
	}, [alertMessage, closeDialog]);

	return (
		<Modal
			className="px-6 py-4"
			isOpen={!!alertMessage.text}
			hideCloseButton={true}
			onClose={closeDialog}
		>
			<ModalContent>
				<ModalHeader className="p-0">
					{alertMessage.title || t("tip")}
				</ModalHeader>
				<ModalBody className="px-0">{alertMessage.text}</ModalBody>
				<ModalFooter className="p-0">
					<Button
						color="primary"
						onClick={closeDialog}
						onKeyDown={handleKeyboardClick(closeDialog)}
					>
						{t("ok")}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default Alert;
