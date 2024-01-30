import Image from "next/image";

export const Header = () => {
    return (
        <div>
            <Image src={'/next.svg'} alt="Main Logo" height={50} width={50} />
            Header
        </div>
    );
}