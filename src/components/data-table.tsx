"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Loader2, Trash2 } from "lucide-react";
import { AddCredit } from "@/app/actions/addCredit";
import { deleteUser } from "@/app/actions/deleteUser";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/nextjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Home({ users: initialUsers }: any) {
  const { session } = useClerk();
  const [isClient, setIsClient] = useState(false);
  const [users, setUsers] = useState(initialUsers); // Store users in a local state
  const [selectedUser, setSelectedUser] = useState<any>(null); // Track user to delete
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog state
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeRowId, setActiveRowId] = useState<string | null>(null); // Track active row

  const columns = [
    {
      name: "User name",
      selector: (row: any) => row.name,
      sortable: true
    },
    {
        name: "Email",
        selector: (row: any) => row.email,
        sortable: true,
        
      },
    
    { name: "Created", selector: (row: any) => row.createdAt, sortable: true },
    {
      name: "Subscription",
      selector: (row: any) => (row.subscription === false ? "No" : "Yes"),
      sortable: true
    },
    {
      name: "Credits Left",
      selector: (row: any) => row.creditsLeft,
      sortable: true
    },
    {
      name: "Add Credits",
      cell: (row: any) => (
        <button
          className={`${
            activeRowId === row.id
              ? "bg-white text-[#8C52FF]"
              : "bg-[#8C52FF] text-white"
          } px-2 py-1 rounded  cursor-pointer`}
          onClick={() => handleAddCredits(row.id)}
        >
          Add Credits
        </button>
      )
    },
    {
      name: "Delete User",
      cell: (row: any) => (
        <div
          className="bg-red-100 w-8 h-8 flex rounded-full items-center justify-center cursor-pointer"
          onClick={() => {
            setSelectedUser(row); // Set the selected user
            setIsDialogOpen(true); // Open dialog
          }}
        >
          <Trash2 color="#FF0000" size={20} />
        </div>
      )
    }
  ];

  const customStyles = {
    // tableWrapper: {
    //   style: {
    //     border: "1px solid #e0e0e0", // Set border for the entire table
    //     borderRadius: "4px", // Optional: for a slightly rounded appearance
    //   },
    // },
    headCells: {
      style: {
         
        fontWeight: "bold",
      },
    },
    // rows: {
    //   style: {
    //     borderTop: "1px solid #e0e0e0",
    //     borderBottom: "1px solid #e0e0e0",
    //   },
    // },
    // cells: {
    //   style: {
    //     borderRight: "1px solid #e0e0e0",
    //   },
    // },
  };
  

  const conditionalRowStyles = [
    {
      when: (row: any) => row.id === activeRowId,
      style: {
        backgroundColor: "#8C52FF",
        color: "white",
        "&:hover": {
          backgroundColor: "#8C52FF",
          color: "#fff"
        }
      }
    }
  ];

  const handleAddCredits = async (id: string) => {
    const amount = Number(prompt("Enter the amount of credits to add:"));
    if (!amount) return; // Prevent empty or invalid input

    try {
      await AddCredit(id, amount); // API call
      toast.success(`Added ${amount} credits successfully!`);

      // Update the credits for the specific user in the local state
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.id === id
            ? { ...user, creditsLeft: user.creditsLeft + amount }
            : user
        )
      );

      session?.reload(); // Optional: To sync the session, if needed
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);
    try {
      await deleteUser(selectedUser.id); // API call to delete user
      toast.success(`${selectedUser.name} has been deleted successfully!`);

      // Update the local users state
      setUsers((prevUsers: any) =>
        prevUsers.filter((user: any) => user.id !== selectedUser.id)
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error("Failed to delete user.");
    } finally {
      setIsDeleting(false);
      setSelectedUser(null); // Clear selected user
      setIsDialogOpen(false); // Close dialog
    }
  };

  const handleCancel = () => {
    setSelectedUser(null); // Clear selected user
    setIsDialogOpen(false); // Close dialog
  };

  const handleRowClick = (row: any) => {
    setActiveRowId(row.id); // Set the active row
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="p-4 max-w-full space-y-5">
        {isClient && (
          <DataTable
            columns={columns}
            data={users} // Use local state for the table data
            pagination
            highlightOnHover
            striped
            onRowClicked={handleRowClick} // Highlight the clicked row
            conditionalRowStyles={conditionalRowStyles} // Apply styles for active row
            customStyles={customStyles}
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {selectedUser?.name}?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Please wait...
                </>
              ) : (
                <p className="text-xl relative z-10 text-white">Delete</p>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Home;
