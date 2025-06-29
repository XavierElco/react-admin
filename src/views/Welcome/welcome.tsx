import styles from'./welcome.module.less'

const Welcome = () => {
    return (
        <>
            <div className={styles.welcomeContainer}>
                <div className={styles.content}>
                <div className={styles.subTitle}>欢迎使用</div>
                <div className={styles.title}>
                    React Admin 18/19 企业后台管理系统
                </div>
                <div className={styles.desc}>
                    主要使用了react，Antd，TypeScript等技术打造通用后台管理系统
                </div>
                <div className={styles.img}></div>
                </div>
            </div>
        </>
    )
}

export default Welcome 