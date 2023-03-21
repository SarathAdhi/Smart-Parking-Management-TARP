import { PageLayout } from "@/common/layouts/PageLayout";
import React, { useEffect, useState } from "react";
import QRCode from "antd/lib/qrcode";
import { useRouter } from "next/router";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import { toast } from "react-hot-toast";

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

  const url = typeof window !== "undefined" ? window.location.href : "";

  console.log({ url });

  return (
    <PageLayout title="QR Code">
      {!isAuthenticated && (
        <form
          onSubmit={handleAdminLogin}
          className="grid gap-2 place-items-start"
        >
          <Input
            name="username"
            onChange={(e) =>
              setAdminLogin({
                ...adminLogin,
                username: e.target.value,
              })
            }
          />

          <Input
            name="password"
            type="password"
            onChange={(e) =>
              setAdminLogin({
                ...adminLogin,
                password: e.target.value,
              })
            }
          />

          <Button htmlType="submit">Login</Button>
        </form>
      )}

      {isAuthenticated && (
        <div className="grid gap-2">
          <Select
            className="w-full"
            defaultValue={1}
            onChange={setGateNumber}
            options={[
              { value: 1, label: 1 },
              { value: 2, label: 2 },
            ]}
          />

          <Input
            name="vehiclenumber"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
          />

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
