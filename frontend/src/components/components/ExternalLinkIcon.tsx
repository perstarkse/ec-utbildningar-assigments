import { ExternalLinkIconProps } from "../../interfaces/Interfaces"

const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = ({ link, icon, circle }) => {
    return (
        <a className={`${circle ? "circle" : ""}`} href={link} target="_blank" rel="noreferrer">
            <i className={icon}></i>
        </a>

    )
}

export default ExternalLinkIcon