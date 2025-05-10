package com.undf.sistema_planetario.mapper;

import com.undf.sistema_planetario.dto.GuestResponseDto;
import com.undf.sistema_planetario.dto.TicketResponseDto;
import com.undf.sistema_planetario.model.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TicketMapper {
    TicketMapper INSTANCE = Mappers.getMapper(TicketMapper.class);

    @Mapping(target = "id", ignore = true)
    Ticket toEntity(TicketResponseDto dto);

    List<TicketResponseDto> toListDto(List<Ticket> entities);

    TicketResponseDto toDto(Ticket entity);
}
