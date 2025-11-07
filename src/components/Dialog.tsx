import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

const DialogModal = ({ open, onClose, onSubmit }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={onSubmit} type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
const StartDialog = ({ open, onClose, onSubmit }) => {
    const [duration, setDuration] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        const data = {
            duration: Number(duration),
            maxParticipants: Number(maxParticipants),
        };
        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Start Quiz</DialogTitle>
                        <DialogDescription>
                            Set the duration and maximum number of participants for your quiz.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="duration">Duration (seconds)</Label>
                            <Input
                                id="duration"
                                type="number"
                                placeholder="60"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="maxParticipants">Max Participants</Label>
                            <Input
                                id="maxParticipants"
                                type="number"
                                placeholder="30"
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} type="submit">Next</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export { DialogModal, StartDialog }