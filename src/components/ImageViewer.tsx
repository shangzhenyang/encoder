import { Dispatch, SetStateAction } from "react";
import { t } from "i18next";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface Props {
	imageUrl: string | null;
	setImageUrl: Dispatch<SetStateAction<string | null>>;
}

function ImageViewer({ imageUrl, setImageUrl }: Props) {
	function closeDialog() {
		setImageUrl(null);
	}

	if (!imageUrl) {
		return null;
	}
	return <Modal
		isOpen={true}
		className="popup image-viewer"
		overlayClassName="mask"
		onRequestClose={closeDialog}
		shouldCloseOnOverlayClick={true}>
		<header>
			<h1>{t("imageViewer")}</h1>
			<FontAwesomeIcon
				icon={faClose}
				size="lg"
				role="button"
				title={t("close").toString()}
				onClick={closeDialog}
			/>
		</header>
		<div>
			<img src={imageUrl} alt={t("decodedImage").toString()} />
		</div>
	</Modal>
}

export default ImageViewer;
