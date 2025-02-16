import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface FilterModalPropsInterface {
  isOpen: boolean;
  onClose: () => void;
  games: string[];
  selectedGame: string | null;
  setSelectedGame: (game: string | null) => void;
  isRanked: boolean | null;
  setIsRanked: (isRanked: boolean | null) => void;
  applyFilters: () => void;
}

const FilterSessionModal = ({
  isOpen,
  onClose,
  games,
  selectedGame,
  setSelectedGame,
  isRanked,
  setIsRanked,
  applyFilters,
}: FilterModalPropsInterface) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtrar Sessões</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="game" className="text-right">
              Jogo
            </Label>
            <Select
              value={selectedGame || ""}
              onValueChange={(value) => setSelectedGame(value || null)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um jogo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os jogos</SelectItem>
                {games.map((game) => (
                  <SelectItem key={game} value={game}>
                    {game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ranked" className="text-right">
              Ranked
            </Label>
            <Switch
              id="ranked"
              checked={isRanked === true}
              onCheckedChange={(checked) => setIsRanked(checked ? true : null)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              applyFilters();
              onClose();
            }}
          >
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterSessionModal;
