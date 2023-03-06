package es.urjc.tfg.scarrascosa.Coin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin, Long>{

    public Optional<Coin> findByTicker(String ticker);

}
