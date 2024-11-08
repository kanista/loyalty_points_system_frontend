import {Button, Form, Input, message} from "antd";
import HomeService from "../service/HomeService";
import './UserForm.scss';

const UserForm =()=>{
    const [form]=Form.useForm();

    const onFinish=async (values)=>{
        try {
            const response = await HomeService.createUser(values);
            if (response.status === 201) {
                message.success(response.data.message || "User created successfully!");
                localStorage.setItem("user", JSON.stringify(response.data.data));
                form.resetFields();
            } else {
                message.error(response.data.message || "Failed to create user.");
            }
        } catch (error) {
            message.error("Failed to create user. Please try again.");
            console.error("Error creating user:", error);
        }
    }

    return(
        <Form
            form={form}
            name="createUserForm"
            className="create-user-form"
            layout="vertical"
            onFinish={onFinish}
        >
            <h2>Add New User </h2>

            <Form.Item
                label="Name"
                name="name"
                rules={[{required: true, message: 'Please enter the name'}]}
            >
                <Input placeholder="Enter name"/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {required: true, message: 'Please enter the email'},
                    {type: 'email', message: 'Please enter a valid email'},
                ]}
            >
                <Input placeholder="Enter email"/>
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
                rules={[{required: true, message: 'Please enter the address'}]}
            >
                <Input placeholder="Enter address"/>
            </Form.Item>

            <Form.Item
                label="Phone No"
                name="phone"
                rules={[
                    {required: true, message: 'Please enter the phone number'},
                    {pattern: /^[0-9]+$/, message: 'Phone number should be numeric'},
                ]}
            >
                <Input placeholder="Enter phone number"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create User
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UserForm;