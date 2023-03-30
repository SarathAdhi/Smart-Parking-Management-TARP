import { PageLayout } from "@/common/layouts/PageLayout";
import React, { useEffect, useState } from "react";
import QRCode from "antd/lib/qrcode";
import { useRouter } from "next/router";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import { toast } from "react-hot-toast";
import { ElementWrapper } from "@/common/components/ElementWrapper";

const AdminPanel = () => {
  const router = useRouter();
  const [adminLogin, setAdminLogin] = useState({
    username: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gateNumber, setGateNumber] = useState(1);

  const [vehicleNumber, setVehicleNumber] = useState("");

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();

    if (adminLogin.username === "admin" && adminLogin.password === "admin") {
      toast.success("Login Successful");
      setIsAuthenticated(true);

      return;
    }

    toast.error("Invalid credentials");
  }

  const url = typeof window !== "undefined" ? window.location.origin : "";

  console.log({ url });

  return (
    <PageLayout title="QR Code">
      {!isAuthenticated && (
        <form
          onSubmit={handleAdminLogin}
          className="grid gap-4 place-items-start"
        >
          <ElementWrapper label="Username">
            <Input
              name="username"
              placeholder="Enter the username"
              onChange={(e) =>
                setAdminLogin({
                  ...adminLogin,
                  username: e.target.value,
                })
              }
            />
          </ElementWrapper>

          <ElementWrapper label="Password">
            <Input
              name="password"
              type="password"
              placeholder="Enter the password"
              onChange={(e) =>
                setAdminLogin({
                  ...adminLogin,
                  password: e.target.value,
                })
              }
            />
          </ElementWrapper>

          <Button htmlType="submit">Login</Button>
        </form>
      )}

      {isAuthenticated && (
        <div className="grid gap-4">
          <ElementWrapper label="Floor Number">
            <Select
              className="w-full"
              placeholder="Floor number"
              defaultValue={1}
              onChange={setGateNumber}
              options={[
                { value: 1, label: 1 },
                { value: 2, label: 2 },
              ]}
            />
          </ElementWrapper>

          <ElementWrapper label="Vehicle Number">
            <Input
              name="vehiclenumber"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            />
          </ElementWrapper>

          {vehicleNumber && (
            <QRCode
              value={`${url}?vehicle=${vehicleNumber}&gate=${gateNumber}`}
            />
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default AdminPanel;
