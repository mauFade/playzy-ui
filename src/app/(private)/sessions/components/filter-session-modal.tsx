import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FilterModalPropsInterface {
  isOpen: boolean;
  onClose: () => void;
  selectedGame: string | null;
  setSelectedGame: (game: string | null) => void;
  selectedRank: string | null;
  setSelectedRank: (rank: string | null) => void;
  applyFilters: () => void;
}

const FilterSessionModal = ({
  isOpen,
  onClose,
  selectedGame,
  setSelectedGame,
  selectedRank,
  setSelectedRank,
  applyFilters,
}: FilterModalPropsInterface) => {
  const [filterByGame, setFilterByGame] = useState<boolean>(false);
  const [filterByRank, setFilterByRank] = useState<boolean>(false);
  const [gameInput, setGameInput] = useState<string>("");
  const [rankInput, setRankInput] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setFilterByGame(!!selectedGame);
      setFilterByRank(!!selectedRank);
      setGameInput(selectedGame || "");
      setRankInput(selectedRank || "");
    }
  }, [isOpen, selectedGame, selectedRank]);

  const handleApply = () => {
    setSelectedGame(filterByGame ? gameInput : null);
    setSelectedRank(filterByRank ? rankInput : null);
    applyFilters();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtrar Sessões</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="filterGame"
                checked={filterByGame}
                onCheckedChange={(checked) => {
                  setFilterByGame(checked as boolean);
                  if (!checked) setGameInput("");
                }}
              />
              <Label htmlFor="filterGame">Filtrar por jogo</Label>
            </div>
            {filterByGame && (
              <Input
                placeholder="Digite o nome do jogo..."
                value={gameInput}
                onChange={(e) => setGameInput(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="filterRank"
                checked={filterByRank}
                onCheckedChange={(checked) => {
                  setFilterByRank(checked as boolean);
                  if (!checked) setRankInput("");
                }}
              />
              <Label htmlFor="filterRank">Filtrar por rank</Label>
            </div>
            {filterByRank && (
              <Input
                placeholder="Digite o rank..."
                value={rankInput}
                onChange={(e) => setRankInput(e.target.value)}
                className="mt-2"
              />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleApply}>
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterSessionModal;
