import './ContentInfo.css'

const ContentInfo = (props) => {
    const { id, img, title, info } = props
    return (
        <>
            <div className="content-info" key={id}>
                <img src={img} alt='baanism content' />
                <h3>{title}</h3>
                <p>{info}</p>
            </div>
        </>
    )
}

export default ContentInfo