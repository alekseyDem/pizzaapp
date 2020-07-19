import React from "react";
import {Result, Typography, Spin} from "antd";
import styles from './LoadingHandler.module.css';
import {LOADING_STATUSES} from "../api";
import CloseCircleOutlined from "@ant-design/icons/lib/icons/CloseCircleOutlined";
const { Paragraph, Text } = Typography;

export const LoadingHandler = ({children, errorMessage, loadingStatus, minHeight = 200}) => {
    return <>
        {
            loadingStatus === LOADING_STATUSES.SUCCESS && children
        }
        {loadingStatus === LOADING_STATUSES.LOADING && <div style={{minHeight: minHeight}} className={styles.spinnerWrapper}>
            <div className={styles.spinner}>
                <Spin/>
            </div>
        </div>
        }
        {loadingStatus === LOADING_STATUSES.FAILURE && <Result
            status="error"
            title="Loading Failed"
        >
            <div className="desc">
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        The following error happen:
                    </Text>
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined className="site-result-demo-error-icon" /> {errorMessage.message}
                </Paragraph>
            </div>
        </Result>
        }
    </>
};