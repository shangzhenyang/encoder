import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { t } from "i18next";
import classnames from "classnames";
import Modal from "react-modal";

import styles from "@/styles/Alert.module.css";

import type AlertMessage from "@/types/AlertMessage";

interface Props {
	alertMessage: AlertMessage | null;
	setAlertMessage: Dispatch<SetStateAction<AlertMessage | null>>;
}

function Alert({ alertMessage, setAlertMessage }: Props) {
	function closeDialog() {
		setAlertMessage(null);
	}

	const closeDialogCallback = useCallback(
		closeDialog,
		[setAlertMessage]
	);
	const onKeyDown = useCallback((evt: KeyboardEvent) => {
		if (evt.key === "Enter") {
			closeDialogCallback();
		}
	}, [closeDialogCallback]);

	useEffect(() => {
		if (alertMessage) {
			document.addEventListener("keydown", onKeyDown);
		} else {
			document.removeEventListener("keydown", onKeyDown);
		}
	}, [alertMessage, onKeyDown]);

	if (!alertMessage) {
		return null;
	}
	return (
		<Modal
			isOpen={true}
			className={classnames("popup", styles["alert"])}
			overlayClassName="mask"
			onRequestClose={closeDialog}
			shouldCloseOnOverlayClick={true}>
			<h1>{alertMessage.title}</h1>
			<p>{alertMessage.text}</p>
			<div className={styles["btn-bar"]}>
				<button
					className="default-btn"
					type="button"
					onClick={closeDialog}>
					{t("ok")}
				</button>
			</div>
		</Modal>
	);
}

export default Alert;
