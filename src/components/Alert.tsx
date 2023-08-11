import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAlertMessage } from "@/redux/reducers/app";
import styles from "@/styles/Alert.module.css";
import classnames from "classnames";
import { t } from "i18next";
import { useCallback, useEffect } from "react";
import Modal from "react-modal";

function Alert(): JSX.Element {
	const dispatch = useAppDispatch();
	const alertMessage = useAppSelector((state) => {
		return state.app.alertMessage;
	});

	const closeDialog = useCallback(() => {
		dispatch(setAlertMessage({}));
	}, [dispatch]);

	const onKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === "Enter") {
			closeDialog();
		}
	}, [closeDialog]);

	useEffect(() => {
		if (alertMessage) {
			document.addEventListener("keydown", onKeyDown);
		} else {
			document.removeEventListener("keydown", onKeyDown);
		}
	}, [alertMessage, onKeyDown]);

	return (
		<Modal
			isOpen={!!alertMessage.text}
			className={classnames("popup", styles["alert"])}
			overlayClassName="mask"
			onRequestClose={closeDialog}
			shouldCloseOnOverlayClick={true}
		>
			<h1>{alertMessage.title || t("tip")}</h1>
			<p>{alertMessage.text}</p>
			<div className={styles["btn-bar"]}>
				<button
					className="default-btn"
					type="button"
					onClick={closeDialog}
				>
					{t("ok")}
				</button>
			</div>
		</Modal>
	);
}

export default Alert;
