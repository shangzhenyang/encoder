import { useStore } from "@/store";
import { closeDialog } from "@/utils";
import { Button, Modal } from "@heroui/react";
import { t } from "i18next";
import type { JSX } from "react";
import { useCallback } from "react";

function MessageDialog(): JSX.Element {
	const dialog = useStore((state) => state.dialog);
	const isDialogShown = useStore((state) => state.isDialogShown);

	const handleOkPress = useCallback(() => {
		closeDialog();
	}, []);

	const handleOpenChange = useCallback((isOpen: boolean) => {
		if (!isOpen) {
			closeDialog();
		}
	}, []);

	return (
		<Modal.Backdrop
			isOpen={isDialogShown}
			onOpenChange={handleOpenChange}
		>
			<Modal.Container>
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Heading>
							{dialog.title || t("tip")}
						</Modal.Heading>
					</Modal.Header>
					<Modal.Body>{dialog.text}</Modal.Body>
					<Modal.Footer>
						<Button
							autoFocus
							onPress={handleOkPress}
						>
							{t("ok")}
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}

export default MessageDialog;
