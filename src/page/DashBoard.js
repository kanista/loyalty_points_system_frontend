import React, { useEffect, useState } from "react";
import { Table, Button, Modal, InputNumber, message, Row, Divider, Descriptions } from "antd";
import loyaltyService from "../service/HomeService";
import moment from "moment";
import "./Dashboard.scss";
import {EyeOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [isAddPointsModalVisible, setIsAddPointsModalVisible] = useState(false);
    const [isRedeemPointsModalVisible, setIsRedeemPointsModalVisible] = useState(false);
    const [isUserDetailModalVisible, setIsUserDetailModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [productPrice, setProductPrice] = useState(0);
    const [calculatedPoints, setCalculatedPoints] = useState(0);
    const [redeemPoints, setRedeemPoints] = useState(0);

    const fetchCustomers = async () => {
        const response = await loyaltyService.getAllCustomersWithPoints();
        if (response.status === 200) {
            setCustomers(response.data);
        } else {
            console.error("Unexpected API response:", response);
            setCustomers([]);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAddPoints = (customer) => {
        setSelectedCustomer(customer);
        setProductPrice(0);
        setCalculatedPoints(0);
        setIsAddPointsModalVisible(true);
    };

    const handleAddPointsSubmit = async () => {
        const pointsToAdd = calculatedPoints;
        const response = await loyaltyService.addPoints(selectedCustomer.customerId, pointsToAdd);
        if (response.status === 200) {
            message.success(response.message || "Points added successfully!");
            setIsAddPointsModalVisible(false);
            fetchCustomers();
        } else {
            message.error(response.message || "Failed to add points.");
        }
    };

    const handleRedeemPoints = (customer) => {
        setSelectedCustomer(customer);
        setRedeemPoints(0);
        setIsRedeemPointsModalVisible(true);

    };

    const handleRedeemSubmit = async () => {
        const response = await loyaltyService.redeemPoints(selectedCustomer.customerId, redeemPoints);
        if (response.status === 200) {
            message.success(response.message || "Points redeemed successfully!");
            setIsRedeemPointsModalVisible(false);
            fetchCustomers();
        } else {
            message.error(response.message || "Failed to redeem points.");
        }
    };

    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
        setIsUserDetailModalVisible(true);

    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Points", dataIndex: "points", key: "points" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddPoints(record)}
                        style={{ marginRight: "3px" ,color:"#007BFFD8"}}
                    />
                    <Button
                        type="text"
                        icon={<MinusOutlined />}
                        onClick={() => handleRedeemPoints(record)}
                        style={{ marginRight: "3px" ,color:"red"}}
                    />
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                    />
                </>
            ),
        },
    ];

    return (
        <div className="dashboard-container">
            <Row gutter={24}>
                <h3>Loyalty Points Dashboard</h3>
                <Divider />
            </Row>

            <Table
                columns={columns}
                dataSource={customers || []}
                rowKey={(record) => record.customerId}
            />

            <Modal
                open={isUserDetailModalVisible}
                onCancel={() => setIsUserDetailModalVisible(false)}
                footer={null}
            >
                <Descriptions title="Customer Info" bordered column={1}>
                    <Descriptions.Item label="Name">{selectedCustomer?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{selectedCustomer?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone No">{selectedCustomer?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Points">{selectedCustomer?.points}</Descriptions.Item>
                    <Descriptions.Item label="Last Updated">
                        {selectedCustomer?.lastUpdated
                            ? moment(selectedCustomer.lastUpdated).format("DD MMM YYYY, HH:mm")
                            : "N/A"}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>

            <Modal
                title="Add Points"
                open={isAddPointsModalVisible}
                onCancel={() => setIsAddPointsModalVisible(false)}
                footer={null}
            >
                <p>Enter Product Price:</p>
                <InputNumber
                    value={productPrice}
                    onChange={(value) => {
                        setProductPrice(value);
                        setCalculatedPoints(value * 0.05);
                    }}
                    min={0}
                    style={{ width: "100%" }}
                />
                <p>Calculated Points: {calculatedPoints}</p>

                <Button
                    className="modal-btn"
                    type="primary"
                    onClick={handleAddPointsSubmit}
                >
                    Add Points
                </Button>
            </Modal>

            <Modal
                title="Redeem Points"
                open={isRedeemPointsModalVisible}
                onCancel={() => setIsRedeemPointsModalVisible(false)}
                footer={null}
            >
                <p>Total Points: {selectedCustomer?.points || 0}</p>
                <InputNumber
                    min={1}
                    value={redeemPoints}
                    onChange={(value) => {
                        setRedeemPoints(value);
                    }}
                    style={{ width: "100%", marginBottom: "20px" }}
                />

                <Button
                    type="primary"
                    onClick={handleRedeemSubmit}
                    className="modal-btn"
                >
                    Redeem Points
                </Button>
            </Modal>
        </div>
    );
};

export default Dashboard;
