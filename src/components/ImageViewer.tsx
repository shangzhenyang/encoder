import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setImageInfo } from "@/redux/reducers/app";
import styles from "@/styles/ImageViewer.module.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { t } from "i18next";
import ReactModal from "react-modal";

function ImageViewer(): JSX.Element {
	const dispatch = useAppDispatch();
	const imageInfo = useAppSelector((state) => {
		return state.app.imageInfo;
	});

	const closeDialog = (): void => {
		dispatch(setImageInfo({}));
	};

	return (
		<ReactModal
			isOpen={!!imageInfo.src}
			className={classNames("popup", styles["image-viewer"])}
			overlayClassName="mask"
			onRequestClose={closeDialog}
			shouldCloseOnOverlayClick={true}
		>
			<header>
				<h1>{t("imageViewer")}</h1>
				<FontAwesomeIcon
					icon={faClose}
					size="lg"
					role="button"
					tabIndex={0}
					title={t("close").toString()}
					onClick={closeDialog}
				/>
			</header>
			<img src={imageInfo.src} alt={imageInfo.alt} />
		</ReactModal>
	);
}

export default ImageViewer;
